import { UserAuthorized as UserAuthorizedEvent } from "../generated/UserRegistry/UserRegistry"
import { UserAuthorized } from "../generated/schema"

export function handleUserAuthorized(event: UserAuthorizedEvent): void {
  let entity = new UserAuthorized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.role = event.params.role

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
