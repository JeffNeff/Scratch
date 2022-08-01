import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  Lottery,
  NewPlayer,
} from "../generated/Lottery/Lottery";
import { Player, Sender } from "../generated/schema";

export function handleNewPlayer(event: NewPlayer): void {
  let player = new Player(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  player.address = event.params.player;
  player.createdAt = event.block.timestamp;
  player.transactionHash = event.transaction.hash.toHex();

  player.save();
  // sender.save();
}
