import Header from "./MyComponents/Header";
import SearchComponent from "./MyComponents/SearchComponent";
import FeaturedComponent from "./MyComponents/FeaturedComponent";
import OfferComponent from "./MyComponents/OfferComponent";
import WhyComponent from "./MyComponents/WhyComponent";
import Cities from "./MyComponents/Cities";
import {Faq}  from "./MyComponents/Faq";
import Ourinvestor  from "./MyComponents/Ourinvestor";
import {Ourjourney} from "./MyComponents/Ourjourney"
import Playstore from "./MyComponents/PlayStore"
import Footer from "./MyComponents/Footer";
import {getData} from "../Services/FetchNodeServices";
import {useEffect,useState} from "react";

export default function Home(props){
    const [Features,setFeatures]=useState([])
    const getAllFeature=async()=>{
    var    result=await getData('userinterface/all_feature')
    setFeatures(result.data)

    }

   
    useEffect(function(){

        getAllFeature()
    },[])
return(
    <div style={{display:'flex',flexDirection:'column',background:'#dff9fb'}}>
    <Header/>
    <div>
        <SearchComponent/>
        
    
    </div>
    <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'94%'}}>
    <FeaturedComponent title="Featured" image={Features}/>
    </div>
   </div>

   <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'94%'}}>
    <OfferComponent title="Offers" />
    </div>
   </div>

   <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'90%'}}>
    <WhyComponent title="Why Us?" />
    </div>
   </div>

   <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'90%'}}>
    <Cities/>
    </div>
   </div>

   <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'90%'}}>
    <Faq/>
    </div>
   </div>

   <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'90%'}}>
    <Ourinvestor />
    </div>
   </div>

   <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'90%'}}>
    <Ourjourney />
    </div>
   </div>

   <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'90%'}}>
    <Playstore />
    </div>
   </div>

   <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{width:'90%'}}>
    <Footer />
    </div>
   </div>

    </div>
)
}