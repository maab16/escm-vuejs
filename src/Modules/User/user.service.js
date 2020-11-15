import http from '@/app/services/localHttpCommon.js'
import User from '@/Modules/User/user.model'
import RoleUser from '@/Modules/RoleUser/role-user.model'
import Organization from '@/Modules/Organization/organization.model'
import RoleUserService from '@/Modules/RoleUser/role-user.service'
import OrganizationService from '@/Modules/Organization/organization.service'

const ENDPOINT = 'users'

class UserService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
  verifyInternalUser (email) {
    return !!User.query().where('email', email).exists()
  }
  get (id) {
    return http.get(ENDPOINT, id)
  }
  getByEmail (email) {
    return User.query().with('organization').where('email', email).first()
  }
  getMaxId () {
    return User.query().max('id')
  }
  createUser (data) {
    let users = this.all()
    let roleUsers = RoleUserService.all()
    let organizations = OrganizationService.all()

    Organization.insert({data: organizations})

    let organization = Organization.query().where('email', data.organization_email).first()
    let userId = this.getMaxId() > 0 ? this.getMaxId() + 1 : 1

    users.push({
      id: userId,
      organization_id: organization.id,
      email: data.email,
      fname: data.fname,
      lname: data.lname,
      mobile: data.mobile
    })

    roleUsers.push({
      id: RoleUser.query().max('id') > 0 ? RoleUser.query().max('id') + 1 : 1,
      user_id: userId,
      role_id: 6
    })

    this.store(users)
    RoleUserService.store(roleUsers)
    RoleUser.insert({data: roleUsers})
    User.insert({data: users})
  }
  setUser (email) {
    let users = this.all()
    User.insert({data: users})
    let user = User.query().withAll().where('email', email).first()
    http.post('user', user)
    return user
  }
}

export default new UserService()
