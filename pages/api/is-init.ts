import * as fcl from "@onflow/fcl"
import {NextApiRequest, NextApiResponse} from "next"
import getConfig from "next/config"
import fclConfig from "src/fclConfig"

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  fclConfig(
    serverRuntimeConfig.flowAccessNode,
    publicRuntimeConfig.flowAccountAddress,
    publicRuntimeConfig.contractFungibleToken,
    publicRuntimeConfig.contractFlowToken,
    publicRuntimeConfig.contractFUSD
  )

  try {
    const account = await fcl
      .send([fcl.getAccount(publicRuntimeConfig.flowAccountAddress)])
      .then(fcl.decode)
    if (account["contracts"]["FCL"]) {
      res.status(200).json(true)
    } else {
      res.status(200).json(false)
    }
  } catch (error) {
    res.status(200).json(false)
  }
}
