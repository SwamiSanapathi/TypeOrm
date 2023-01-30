// import { AppDataSource } from "./data-source"
// import { Photos } from "./entity/Photos"
// import { Profile } from "./entity/Profile"
// import { User } from "./entity/User"

// AppDataSource.initialize()
//   .then(async () => {

//     // One to One
//     const pro = new Profile()
//     pro.gender = "Male"
//     pro.age = 12
//     await AppDataSource.manager.save(pro)

//     const user = new User()
//     user.name = "Lakshmnan"
//     user.profile = pro

//     await AppDataSource.manager.save(user)
//   })