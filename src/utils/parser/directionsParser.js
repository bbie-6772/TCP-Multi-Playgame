export const calculateDirection = ({up, down, left, right}) => {
    // 45도  
    if (up && right) return Math.PI / 4;
    // 135도
    if (up && left) return 3 * Math.PI / 4;
    // 225도  
    if (down && left) return 5 * Math.PI / 4;
    // 315도
    if (down && right) return 7 * Math.PI / 4;    
    // 90도  
    if (up) return Math.PI / 2;
    // 270도
    if (down) return 3 * Math.PI / 2;
    // 180도
    if (left) return Math.PI;
    // 0도
    if (right) return 0;    

    return -1; // 무방향  
}