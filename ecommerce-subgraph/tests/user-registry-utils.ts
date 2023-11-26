import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { UserAuthorized } from "../generated/UserRegistry/UserRegistry"

export function createUserAuthorizedEvent(
  user: Address,
  role: i32
): UserAuthorized {
  let userAuthorizedEvent = changetype<UserAuthorized>(newMockEvent())

  userAuthorizedEvent.parameters = new Array()

  userAuthorizedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "role",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(role))
    )
  )

  return userAuthorizedEvent
}
