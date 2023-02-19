import { useSigner } from "wagmi";
import Instances from "../Utils/ContractInstances";
const useCancelStream = () => {
  const { data } = useSigner();
  const { streamContractInstance } = Instances();

  async function cancelStream(streamId: number) {
    console.log("Called");
    const res = await streamContractInstance
      .connect(data)
      .CancelStream(streamId, { gasLimit: 30000 });
    await res.wait();
  }

  return cancelStream;
};

export default useCancelStream;
