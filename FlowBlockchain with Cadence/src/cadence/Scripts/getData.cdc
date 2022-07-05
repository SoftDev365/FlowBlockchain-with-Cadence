
import DBContract from 0x02
  
pub fun main(): [[String]]{

    let DBAccount = getAccount(0x02)

    let userCapability = DBAccount.getCapability<&{DBContract.User}>(DBContract.DBPublicPath)

    let userReference = userCapability.borrow()
        ?? panic("Could not borrow a reference to the hello capability")

    log(userReference.getData())

    return userReference.getData()
}