pub contract DBContract {

  pub let DBPublicPath: PublicPath
  pub let DBStoragePath: StoragePath

  pub event replaceData(array: [[String]])
  pub event updateData(_id : UInt64, _record : [String])
  pub event removeData(_id : UInt64)
  pub event addData(_id : UInt64, _record : [String])

  pub resource interface Admin {
    pub fun replaceData(dataArray: [[String]])
    pub fun updateData(id: UInt64, record : [String])
    pub fun removeData(id: UInt64)
  }
  pub resource interface User {
    pub fun getData(): [[String]]
  }
  pub resource Store: Admin, User {

    pub var data:[[String]]

    init() {
        self.data = [[]]
    }

    pub fun replaceData(dataArray: [[String]]) {
        self.data = dataArray
        emit replaceData(array : self.data)
    }
    pub fun getData(): [[String]] {
        return self.data
    }
    pub fun updateData(id: UInt64, record : [String]) {
        self.data[id] = record
        emit updateData(_id: id, _record: self.data[id])
    }
    pub fun removeData(id: UInt64) {
        self.data.remove(at: id)
        emit removeData(_id: id)
    }
    pub fun addData(record: [String]) {
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
