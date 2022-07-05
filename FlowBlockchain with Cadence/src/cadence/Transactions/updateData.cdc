
import DBContract from 0x02

transaction (_id : UInt64, _record: [String]){

    let adminUser: &DBContract.Store
    // No need to do anything in prepare because we are not working with
    // account storage.
	prepare(signer: AuthAccount) {
        self.adminUser = signer.borrow<&DBContract.Store>(from: DBContract.DBStoragePath) ?? panic ("Signer is not DB admin")
    }

	execute {
        self.adminUser.updateData(id: _id, record : _record)	
	}
}