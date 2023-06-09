import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "../../global/Container";
import { UserContext } from "../../global/UserContext";
import Feed from "../Feed/Feed";
import UserHeader from "./UserHeader";
import UserPhotoPost from "./UserPhotoPost";
import UserStatistic from "./UserStatistic";
import NotFound from "../../pages/NotFound";
import { Head } from "../Interfaces/Head";

export default function User(){
    const{ data }= React.useContext(UserContext)
    return (
        <Container>
            <Head
                title="Minha conta "
            />
            <UserHeader />
            <Routes>
                <Route path="/" element={<Feed  user={data.id}/>}/>
                <Route path="post" element={<UserPhotoPost />}/>
                <Route path="statistic" element={<UserStatistic />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>  
        </Container>   
    )
}
