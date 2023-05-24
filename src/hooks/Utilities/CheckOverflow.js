import {
    useState,
    useLayoutEffect,

} from 'react';

export const useIsOverflow = (type, ref, callback) => {

    /**
     * 
     * @param {*} type Either "vertical", "horizontal", or all overflow
     * @param {*} current Reference?
     */
    const checkOverflowType = (type, current) => {
        const vertical = current.scrollWidth > current.clientWidth;
        const horizontal = current.scrollHeight > current.clientHeight
        const both = (vertical || horizontal)
        switch (type) {
            case "vertical": return vertical
            case "horizontal": return horizontal
            default: return both
        }
    }
  
    const checkOverflow = () => {  
      const trigger = () => {
        const hasOverflow = checkOverflowType(type, ref);
        if (callback) callback(hasOverflow);
        return hasOverflow;
      };
  
      if (ref) {
        return trigger();
      }
    };
  
    return checkOverflow();
  };

  /*
    HELPFUL RESOURCES
    - https://www.robinwieruch.de/react-custom-hook-check-if-overflow/


   */