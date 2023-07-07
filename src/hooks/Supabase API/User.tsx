import { supabase } from './../../supabase';

export async function getUser(uuid: any) {
    const { data: user, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('userid', uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return await user;
}