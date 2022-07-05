transaction(code: String) {
  prepare(acct: AuthAccount) {
    acct.contracts.add(name: "MyNFTContract", code: code.decodeHex())
  }
}