import { useParams } from "react-router-dom";

export default function Finder() {

    // Variables ----------------------------------------------------------------------

    const { searchElement } = useParams<{ searchElement: string }>();

    // UseEffect ----------------------------------------------------------------------
    // Functions ----------------------------------------------------------------------

    return (<div>
         {searchElement}
    </div>
       
    );

}