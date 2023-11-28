import "./style.css";
import { disconnect, getAccount, watchAccount } from "@wagmi/core";
import { rabbyKit } from "./rabbykit.ts";

function connect() {
  if (getAccount().isConnected) {
    disconnect();
  } else {
    rabbyKit.open();
  }
}

const btnEl = document.getElementById("btn");
const userEl = document.getElementById("user");

btnEl?.addEventListener("click", connect);

// listening for account changes
watchAccount((account) => {
  if (userEl && btnEl) {
    userEl.innerText = account.address ?? "";
    if (account.isConnected) {
      btnEl.innerText = "Disconnect";
    } else {
      btnEl.innerText = "Connect";
    }
  }
});
