import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  Lottery,
  NewPlayer,
} from "../generated/Lottery/Lottery";
import { Player, Sender } from "../generated/schema";

export function handleNewPlayer(event: NewPlayer): void {
  let senderString = event.params.sender.toHexString();

  let sender = Sender.load(senderString);

  if (sender === null) {
    sender = new Sender(senderString);
    sender.address = event.params.sender;
    sender.createdAt = event.block.timestamp;
  } else {
    sender.purposeCount = sender.purposeCount.plus(BigInt.fromI32(1));
  }

  let player = new Player(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  player.sender = senderString;
  player.createdAt = event.block.timestamp;
  player.transactionHash = event.transaction.hash.toHex();

  player.save();
  sender.save();
}
