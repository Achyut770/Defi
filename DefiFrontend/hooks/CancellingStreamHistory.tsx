import React from "react";
import { useAccount } from "wagmi";
import Instances from "../Utils/ContractInstances";
import { ActivityHistoryInput } from "./withdrawingHistory";
import { StreamsDataForCancellingHistory } from "../src/Components/ActivityHistory/Card/CancelStream";

const useCancellingHistory = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setStreamData: React.Dispatch<
    React.SetStateAction<StreamsDataForCancellingHistory[]>
  >,
  input: ActivityHistoryInput
) => {
  const { address } = useAccount();
  const { streamContractInstance } = Instances();
  const fetchWithDrawHistory = async () => {
    const filterForEthAsSender =
      streamContractInstance.filters.CancelStreamWithEth(
        null,
        address,
        null,
        null,
        null
      );
    const filterForEthAsReceiver =
      streamContractInstance.filters.CancelStreamWithEth(
        null,
        null,
        address,
        null,
        null
      );
    const filterForTokenAsReceiver =
      streamContractInstance.filters.CancelStreamWithToken(
        null,
        null,
        address,
        null,
        null,
        null
      );
    const filterForTokenAsSender =
      streamContractInstance.filters.CancelStreamWithToken(
        null,
        address,
        null,
        null,
        null,
        null
      );
    const eventAsReceiverForToken = await streamContractInstance.queryFilter(
      filterForEthAsSender
    );
    const eventAsSenderForEth = await streamContractInstance.queryFilter(
      filterForTokenAsSender
    );

    const eventAsReceiverForEth = await streamContractInstance.queryFilter(
      filterForTokenAsReceiver
    );

    const eventAsSenderForToken = await streamContractInstance.queryFilter(
      filterForEthAsReceiver
    );
    let data: StreamsDataForCancellingHistory[] = [];

    eventAsReceiverForEth.map((items: any) => {
      data.push(items.args);
    });
    eventAsSenderForEth.map((items: any) => {
      data.push(items.args);
    });
    eventAsReceiverForToken.map((items: any) => {
      data.push(items.args);
    });
    eventAsSenderForToken.map((items: any) => {
      data.push(items.args);
    });
    setLoading(() => false);
    setStreamData(() => data);
  };

  React.useEffect(() => {
    fetchWithDrawHistory();
  }, []);
};

export default useCancellingHistory;
