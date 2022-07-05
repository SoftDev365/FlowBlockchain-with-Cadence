
import DBContract from 0x02

transaction(_record: [String]) {

  let adminUser: &DBContract.Store
	
  prepare(signer: AuthAccount) {
        self.adminUser = signer.borrow<&DBContract.Store>(from: DBContract.DBStoragePath) ?? panic ("Signer is not DB admin")
  }

	execute {
        self.adminUser.addData(record: _record)
	}
}