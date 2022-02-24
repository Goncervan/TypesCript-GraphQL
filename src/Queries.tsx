import { gql } from "@apollo/client"

export const handlePage = gql`
    query handlePage($pageNumber: Int){
        characters(page: $pageNumber){
            info{
                next
                prev
                pages
            }
            results{
                id
                name
                gender
                status
                image
            }   
        }
    }
`