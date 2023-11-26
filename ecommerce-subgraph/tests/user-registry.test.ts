import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { UserAuthorized } from "../generated/schema"
import { UserAuthorized as UserAuthorizedEvent } from "../generated/UserRegistry/UserRegistry"
import { handleUserAuthorized } from "../src/user-registry"
import { createUserAuthorizedEvent } from "./user-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let role = 123
    let newUserAuthorizedEvent = createUserAuthorizedEvent(user, role)
    handleUserAuthorized(newUserAuthorizedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("UserAuthorized created and stored", () => {
    assert.entityCount("UserAuthorized", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "UserAuthorized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "UserAuthorized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "role",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
