import React, { useState } from "react"
import * as fcl from "@blocto/fcl"
import * as t from "@onflow/types"

import Card from '../components/Card'
import Header from '../components/Header'
import Code from '../components/Code'
//import DEPLOY_TRANSACTION from '../cadence/Transactions/deployTransaction.cdc'
//import DBCONTRACT from '../cadence/Contracts/DBContract.cdc'

const DEPLOY_TRANSACTION = `\
transaction(code: String) {
  prepare(acct: AuthAccount) {
    acct.contracts.add(name: "DBContract", code: code.decodeHex())
  }
}
`

const DBCONTRACT = `\
pub contract DBContract {

  pub let DBPublicPath: PublicPath
  pub let DBStoragePath: StoragePath

  pub event replaceData(array: [String])
  pub event updateData(_id : UInt64, _record : String)
  pub event removeData(_id : UInt64)
  pub event addData(_id : UInt64, _record : String)

  pub resource interface Admin {
    pub fun replaceData(dataArray: [String])
    pub fun updateData(id: UInt64, record : String)
    pub fun removeData(id: UInt64)
  }
  pub resource interface User {
    pub fun getData(): [String]
  }
  pub resource Store: Admin, User {

    pub var data:[String]

    init() {
        self.data = []
    }

    pub fun replaceData(dataArray: [String]) {
        self.data = dataArray
        emit replaceData(array : self.data)
    }
    pub fun getData(): [String] {
        return self.data
    }
    pub fun updateData(id: UInt64, record : String) {
        self.data[id] = record
        emit updateData(_id: id, _record: self.data[id])
    }
    pub fun removeData(id: UInt64) {
        self.data.remove(at: id)
        emit removeData(_id: id)
    }
    pub fun addData(record: String) {
        self.data.append(record)
        emit addData(_id : UInt64( self.data.length), _record: record)
    }
  }

  pub fun createEmptyStore(): @Store {
      return <-create Store()
  }

  // The init() function is required if the contract contains any fields.
  init() {
      self.DBPublicPath = /public/DBUserPath
      self.DBStoragePath = /storage/DBAdminPath

      let store <- create Store()
      self.account.save(<-store, to: self.DBStoragePath)

      self.account.link<&{User}>(
          self.DBPublicPath,
          target: self.DBStoragePath
      )
      self.account.link<&{Admin}>(
          self.DBPublicPath,
          target: self.DBStoragePath
      )
  }
}
`


const DeployContract = () => {
  const [status, setStatus] = useState("Not started")
  const [transaction, setTransaction] = useState(null)
  // const [user, setUser] = useState({})

  // useEffect(() =>
  //   fcl
  //     .currentUser()
  //     .subscribe(user => setUser({ ...user }))
  //   , [])

  const deployDBContract = async (event) => {
    event.preventDefault()
    console.log(DBCONTRACT)
    setStatus("Resolving...")

    const blockResponse = await fcl.send([
      fcl.getLatestBlock(),
    ])

    const block = await fcl.decode(blockResponse)

    try {
      const { transactionId } = await fcl.send([
        fcl.transaction(DEPLOY_TRANSACTION),
        fcl.args([
          fcl.arg(
            Buffer.from(DBCONTRACT, "utf8").toString("hex"),
            t.String
          )
        ]),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.authorizations([
          fcl.currentUser().authorization
        ]),
        fcl.payer(fcl.currentUser().authorization),
        fcl.ref(block.id),
        fcl.limit(100),
      ])

      setStatus("Transaction sent, waiting for confirmation")

      const unsub = fcl
        .tx({ transactionId })
        .subscribe(transaction => {
          setTransaction(transaction)
          if(transaction.status === 4){
            alert("Token contract Successfully deployed ");
          }
          if (fcl.tx.isSealed(transaction)) {
            setStatus("Transaction is Sealed")
            unsub()
          }
        })
    } catch (error) {
      console.error(error);
      setStatus("Transaction failed")
    }
  }

  return (
    <Card>
      <Header>deploy contract</Header>

      <Code>{DBCONTRACT}</Code>

      <button onClick={deployDBContract}>
        Deploy DB Contract
      </button>
      <samp>  </samp>
      
      <Code>Status: {status}</Code>

      {transaction && <Code>{JSON.stringify(transaction, null, 2)}</Code>}
    </Card>
  )
}

export default DeployContract