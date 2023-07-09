import { Box } from '@chakra-ui/react'
import { supabase } from './../supabase'

export default function List() {

    async function getTasks() {
        const { data: taskData, error } = await supabase
            .from('todos')
            .select('*');

        if (error) {
            console.error(error);
            return;
        }
        return taskData;
    }

    /**
     * 
    
    const [community, setCommunity] = useState<any>();

    useEffect(() => {
        const fetchCommunityData = async() => getCommunity(communityName).then((response) => {
            setCommunity( response );
        })
        fetchCommunityData();
    }, []);

     */

    return(<Box>

    </Box>)
}