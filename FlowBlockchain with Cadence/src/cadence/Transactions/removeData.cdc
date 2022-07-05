
import DBContract from 0x02

transaction(_id : UInt64) {

    let adminUser: &DBContract.Store
	
    prepare(signer: AuthAccount) {
        self.adminUser = signer.borrow<&DBContract.Store>(from: DBContract.DBStoragePath) ?? panic ("Signer is not DB admin")
    }

    execute {
        self.adminUser.removeData(id: _id)
        
    }
}