
export function typeCheck(type) {
    switch(type) {
        case 0:
            return 'Anyone can Join';
        case 1:
            return 'Invite Only';
        case 2:
            return 'Password';
    }
}