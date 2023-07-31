import { supabase } from './../supabase';
import { useToast } from '@chakra-ui/react';

const toast = useToast();

// LEVELS ----------------------------------------------------------------------
// Calculates the amount of experience needed to level up
export function experienceNeeded(level: number) { return (level + 5) ** 4; }

// Calculates the level given the amount of experience a user has
export function calculateLevel(experience: number) {
    let level = 1;
    for (let index = level; experienceNeeded(index) <= experience; index++) {
        experience -= experienceNeeded(index);
        level = index;
    }
    return { level, experience };
}

// Calculates the string value of the percent towards leveling up
export function experiencePercent(exp: number) {
    const levelObject = calculateLevel(exp)
    const level = levelObject.level
    const leftOverExp = levelObject.experience
    const expNeeded = experienceNeeded(level)
    const expPercent = (leftOverExp / expNeeded)

    if (expPercent > 1) {
        console.log("Clan needs to be leveled up")
    }
    return expPercent * 100;
}

// FORMATTING ------------------------------------------------------------------
export function formatNumber(val: Number | String) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// SUPABASE --------------------------------------------------------------------
export async function getUser(uuid: any) {
    const { data: user, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('userid', uuid)
        .single();

    if (error) {
        toastError(error.message);
        // console.error(error);
        return;
    }

    return await user;
}

// Toast System ----------------------------------------------------------------
export function toastError(message: string) {
    toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
    })
}

export function toastSuccess(message: string) {

    toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
    })
}