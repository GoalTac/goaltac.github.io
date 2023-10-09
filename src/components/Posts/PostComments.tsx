import { Avatar, Button, ButtonGroup, Card, CardHeader, HStack, IconButton, Input, Spacer, Spinner, Stack, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Profile, _getComments } from "../Tasks/TaskAPI";
import { getUser } from "../../hooks/Utilities";
import { supabase } from "../../supabase";
import { FaTrash } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";

export default function PostComments({post_uuid, user_uuid, commentCount}: any) {
    const toast = useToast()
    const [offset, setOffset] = useState<number>(0)
    const [comments, setComments] = useState<any>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [userProfile, setUserProfile] = useState<Profile>({
        id: 0,
        created_at: null,
        name: "",
        biography: "",
        userid: "",
        username: "",
        avatarurl: "",
        points: 0,
        streak: 0
    })
    //callback function for submit input to send data back
    const handleSetComments = (newComments: any) => {
        setComments(newComments)
    }
    const handleIncrementCommentCount = (newCount: number) => {
        commentCount(comments.length + 1)
    }
    const handleFetchProfile = (newProfile: Profile) => {
        setUserProfile(newProfile)
    }
    useEffect(()=>{
        async function fetchComments() {
            let fetchedComments = await _getComments(offset, post_uuid, user_uuid)
            setComments(fetchedComments)
        }
        Promise.all([
            fetchComments(),
            
        ]).finally(()=>setLoading(false))
    },[offset])



    const filteredComments = () => {
        return comments.sort((a: any, b: any) => a.created_at > b.created_at ? -1 : 1)
    }

    function CommentCard({comment}: any) {
        const timeDifference = () => {
            let now = new Date().getTime()
            let created_at = new Date(comment.comment_created_at).getTime() 
            let seconds = Math.abs(now - created_at)/1000;

            // calculate (and subtract) whole minutes
            let years = Math.floor(seconds / 31536000);
            seconds -= years * 31536000;

            if (years >= 1) {
                return `${Math.ceil(years)} years ago`
            }

            // calculate (and subtract) whole months
            let months = Math.floor(seconds / 2628000);
            seconds -= months * 2628000;

            if (months >= 1) {
                return `${Math.ceil(months)} months ago`
            }

            // calculate (and subtract) whole weeks
            let weeks = Math.floor(seconds / 604800);
            seconds -= weeks * 604800;

            if (weeks >= 1) {
                return `${Math.ceil(weeks)} weeks ago`
            }

            // calculate (and subtract) whole days
            let days = Math.floor(seconds / 86400);
            seconds -= days * 86400;

            if (days >= 1) {
                return `${Math.ceil(days)} days ago`
            }

            // calculate (and subtract) whole hours
            let hours = Math.floor(seconds / 3600) % 24;
            seconds -= hours * 3600;

            if (hours >= 1) {
                return `${Math.ceil(hours)} hours ago`
            }

            // calculate (and subtract) whole minutes
            let minutes = Math.floor(seconds / 60) % 60;
            seconds -= minutes * 60;

            if (minutes >= 1) {
                return `${Math.ceil(minutes)} minutes ago`
            } else {
                return `${Math.ceil(seconds)} seconds ago`
            }

        }
        const deleteComment = async(uuid: string) => {
            const { data: deletedComment, error: error } = await supabase
                .from('posts_comments')
                .delete().eq('uuid', uuid)
                .select();
            if (error) {
                throw new Error(error.message)
            }
            const decrementCommentValue = async(post_uuid: string) => {
                const { data: decrementComment, error: decrementCommentError } = await supabase.rpc('decrementcomment', { query_post_uuid: post_uuid })
                if (decrementCommentError) {
                    throw new Error(decrementCommentError.message)
                }
                return decrementComment
            }
            toast({
                title: "Deleted comment",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            //adds 1 to the total value of comments in the post
            decrementCommentValue(post_uuid)

            commentCount(comments.length - 1)

            //updates comments, so no need for live updating
            let newComments = comments.filter((it_comment: any)=> it_comment.comment_uuid != uuid); 
            setComments(newComments)
            return deletedComment
        }
        //we are using set state here because avatarurl and time diff take some time to load
        const [duration, setDuration] = useState<string>(timeDifference())
        const [username, setUsername] = useState<string>(comment.username)
        const [avatarurl, setAvatarurl] = useState<string>(comment.avatarurl)

        return <Stack flexDirection='row' paddingY='10px'>
            <Avatar size='sm' name={username} src={avatarurl}/>
            <Stack width='full'>
                <HStack fontSize='12px' spacing='1rem'>
                    <Text>@{username}</Text>
                    <Text>{duration}</Text>
                </HStack>
                <Text>
                    {comment.payload}
                </Text>
            </Stack>
            {(comment.username == userProfile.username) && 
                <Tooltip fontSize='10px' label='Delete'>
                    <IconButton onClick={()=>deleteComment(comment.comment_uuid)} aria-label='delete' variant='unstyled' alignSelf='end' size='xs' icon={<DeleteIcon />} />
                </Tooltip>}
        </Stack>
    }
    function LoadMore() {
        return <Button onClick={()=>setOffset(offset+25)}>Load More</Button>
    }

    return <Stack paddingY='20px'>
        <SubmitComment post_uuid={post_uuid} user_uuid={user_uuid} commentCount={commentCount} handleFetchProfile={handleFetchProfile} handleIncrementCommentCount={handleIncrementCommentCount} handleSetComments={handleSetComments}/>
        {!isLoading && <>
            {filteredComments().map((comment: any, id: number)=> {
                return <CommentCard comment={comment} key={id}/>
            })}
            {comments.length > 24 && <LoadMore/>}
        </>}
    </Stack>

}

//separated to prevent re rendering
function SubmitComment({post_uuid, user_uuid, handleFetchProfile, handleIncrementCommentCount, handleSetComments}: any) {
    const [userProfile, setUserProfile] = useState<Profile>({
        id: 0,
        created_at: null,
        name: "",
        biography: "",
        userid: "",
        username: "",
        avatarurl: "",
        points: 0,
        streak: 0
    })
    const [payload, setPayload] = useState<string>('')
    const [commentClicked, setCommentClicked] = useState<boolean>(false)
    useEffect(()=>{
        async function fetchUserProfile() {
            const profile = await getUser(user_uuid)
            setUserProfile(profile)
            handleFetchProfile(profile)
        }
        fetchUserProfile()
    },[])
    const addComment = async(username: string, post_uuid: string, newPayload: string) => {
        const newComment = {
            username: username, post_uuid: post_uuid, payload: newPayload
        }
    
        const { data: dataComment, error: error } = await supabase
            .from('posts_comments')
            .insert([newComment])
            .select().single();
    
        if (error) {
            throw new Error(error.message)
        }
        const incrementCommentValue = async(post_uuid: string) => {
            const { data: incrementComment, error: incrementCommentError } = await supabase.rpc('incrementcomment', { query_post_uuid: post_uuid })
            if (incrementCommentError) {
                throw new Error(incrementCommentError.message)
            }
            return incrementComment
        }

        //adds 1 to the total value of comments in the post
        incrementCommentValue(post_uuid)

        handleIncrementCommentCount()

        console.log(dataComment)

        //updates comments, so no need for live updating
        handleSetComments((oldComments: any) => [...oldComments, dataComment])
        
        return dataComment
    }
    

    return <Stack height='40px' marginBottom='40px'>
        <HStack>
           <Avatar size='sm' name={userProfile.username} src={userProfile.avatarurl}/>
            <Input onFocus={()=>setCommentClicked(true)} 
                variant='flushed' placeholder='Add a comment...' value={payload} onChange={(e)=>setPayload(e.currentTarget.value)} />
        </HStack>
        {commentClicked && <HStack>
            <Spacer/>
            <ButtonGroup size='sm' spacing='1rem' borderRadius='10px'>
                <Button variant='outline' onClick={()=>{
                    setPayload('')
                    setCommentClicked(false)}}>Cancel</Button>
                <Button variant='solid' onClick={()=>{
                    //clears the user's input box to prevent double commenting
                    const oldPayload = payload
                    setPayload('')
                    addComment(userProfile.username, post_uuid, oldPayload)}}>Comment</Button>
            </ButtonGroup>
        </HStack>}
    </Stack>
}