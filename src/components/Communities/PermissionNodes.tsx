import { supabase } from "../../supabase";

/**
 * When checking a user's roles before executing a task
 * 
 * function addChat(user : user) {
 *  const role = _getMemberRole(user)
 *  if (role.hasPermission("")) {
 *      //send chat
 *  }
 * }
 */

export async function _getMemberRole(userID : string, communityID : string) {
    const { data: data, error } = await supabase
        .from('community_relations')
        .select('role')
        .eq('community_id', communityID)
        .eq('user_id', userID)
        .single();
    
    return new Role(data?.role)
}

export const roles = [
    {
        role : 'admin',
        permissions : ['*']
    },
    {
        role : 'moderator',
        permissions : ["deleteChat", "addTask", "deleteTask", "kickMember", "useChat"]
    }
]

//role.hasPermission()
class Role {

    _role = ''
    _permissions = ['']

    constructor(role : string) {
        this._role = role;
        this.setPermissions(role)
    }

    setPermissions(role : string) {
        const permissions = roles.map((itRole) => {
            return (itRole.role == role && itRole.permissions)
        })
        if (!permissions) {
            throw new Error('Role does not exist')
        }
        this._permissions = permissions as unknown as string[]
    }

    hasPermission(permission : string) {
        return 
    }
}
