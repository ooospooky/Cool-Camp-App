import {Text, StyleSheet, View, TouchableOpacity,ScrollView, Image, ImageBackground  } from 'react-native'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Carousel from 'react-native-snap-carousel'

import StarRating from 'react-native-star-rating';

const CampShow = ({route,navigation }) => {
  // let campData = route.params.data
  console.log('camp userInfo ',route.params)
  let userInfo;
  let accessToken;

  if(route.params){
    if(route.params.userInfo){
      userInfo = route.params.userInfo;
      accessToken = route.params.accessToken;
    }
  }
  // const data = [
  //   {
  //     title: "Aenean leo",
  //     body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
  //     imgUrl: "https://picsum.photos/id/11/200/300",
  //   },
  //   {
  //     title: "In turpis",
  //     body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
  //     imgUrl: "https://picsum.photos/id/10/200/300",
  //   },
  //   {
  //     title: "Lorem Ipsum",
  //     body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
  //     imgUrl: "https://picsum.photos/id/12/200/300",
  //   },
  // ];
  // const CarouselCardItem = ({ item, index }) => {
  //   return (
  //     <View style={styles.container} key={index}>
  //       <Image
  //         source={{ uri: item['url'] }}
  //         style={styles.image}
  //       />
      
  //     </View>
  //   )
  // }
  // const isCarousel = React.useRef(null)
  function renderAverageStar(data){
    if(!data.comment || data.comment.length===0){
        return(
          <View  style={{flexDirection:"row",alignItems: "center",marginTop:10}}>
            <StarRating
              starSize={15}
              disabled={true}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half-sharp'}
              iconSet={'Ionicons'}
              maxStars={5}
              rating={0}
              fullStarColor={'#f5a623'}
              emptyStarColor={'#908e8c'}
            />
            <Text style={{color: COLORS.grey,fontSize:15}}>
              此露營地還沒有評分
            </Text>
          </View>
        )
      }else{
        let total = 0;
        for (let i = 0; i < data.comment.length; i++) {
          total += data.comment[i].rating
          }
        let average = total / data.comment.length
        return(
          <View style={{flexDirection:"row",}}>
             <StarRating
              starSize={30}
              disabled={true}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half-sharp'}
              iconSet={'Ionicons'}
              maxStars={5}
              rating={average}
              fullStarColor={'#f5a623'}
              emptyStarColor={'#908e8c'}
            />
           <Text style={{fontWeight:"bold",paddingLeft:10,fontSize:24}}>{average.toFixed(1)}</Text>
          </View> 
        )
      }
    }
    function renderImageList() {
      if(!route.params.data.imageData || route.params.data.imageData.length===0){
        return(null)
      }else{
        return route.params.data.imageData.map(({url})=>{
          return(
            <View key={url}>
            <Image source={{uri:url}} style={styles.CardImage}></Image>
          
            </View>
          )
        })
      }
    }
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ backgroundColor: COLORS.white, paddingBottom: 20 }}>
    <View style={styles.maincontainer}>

      <ImageBackground
                style={styles.HeaderImage}
                // source={{uri:route.params.data.imageData[0]['url']}}
                source={route.params.data.imageData[0]?{uri:route.params.data.imageData[0]['url']} :{uri:"https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"} }
                
            >
              <View style={styles.Header}>
                    {/* 回上一頁 */}
                    <Icon name="arrow-back" size={28} color={COLORS.white} onPress={navigation.goBack} />
                    {/* 加入書籤 純展示 無作用 */}
                    <Icon name="bookmark-border" size={28} color={COLORS.white} />
                </View>
       </ImageBackground>
         
       <View style={{paddingLeft: 20,paddingRight:20}}>
          <Text style={{ fontSize: 20, fontWeight: "bold",paddingTop:15}}>{route.params.data.title}</Text>
          <Text style={{
                        fontSize: 12,
                        fontWeight: "400",
                        color: COLORS.grey,
                        marginTop: 5,
                    }}>
          {/* 露營地地址 */}
           {route.params.data.location}</Text>
          {/* 星星＆地標Icon */}
          <View style={{flexDirection:"row",alignItems: "center",flexDirection:"row",}}>
            {renderAverageStar(route.params.data)}
            {/* <Text style={{fontWeight:"bold",paddingLeft:10,fontSize:24}}>4.0</Text> */}
            <View style={styles.IconContainer}>
              <Icon name="place" size={28} color={COLORS.white} />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
              <Text style={{fontSize:25,fontWeight: "bold",color:"#83817F"}}>簡介：</Text>
              <Text style={{ lineHeight: 20, color: COLORS.grey }}>{route.params.data.description}</Text>
           </View>
           <View style={{ marginTop: 20 }}>
                <Text style={{fontSize:25,fontWeight: "bold",color:"#83817F"}}>注意須知：</Text>
                <Text style={{ lineHeight: 20}}>{route.params.data.notes}</Text>
           </View>
          </View>
          {/* 圖片展示 */}
          <View>
            {renderImageList()}
          </View>
          {/* 檢查camp's user id 是否符合目前登入id */}
        {userInfo && route.params.data.userId === userInfo.id ? 
        <View style={{flexDirection:"row",}}>
         {/* 修改 */}
          <TouchableOpacity 
            style={styles.editBtn}
            onPress={() => navigation.navigate('CampEdit',{data:route.params.data, userInfo:userInfo, accessToken:accessToken})}
            >
              <Text style={{color:'#fff'}}>修改</Text>
          </TouchableOpacity>
          {/* 刪除 */}
          <TouchableOpacity 
            style={styles.deleteBtn}
            onPress={() => navigation.navigate('CampDelete',{data:route.params.data, userInfo:userInfo, accessToken:accessToken})}
            >
              <Text style={{color:'#fff'}}>刪除</Text>
          </TouchableOpacity>
        </View>
        :null}
        {/* 留言區按鈕 */}
           <TouchableOpacity style={styles.Btn} onPress={()=>navigation.navigate('CommentList',{data:route.params.data, userInfo:userInfo, accessToken:accessToken})}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.white }}>留言區</Text>
          </TouchableOpacity>
    
     

    </View>
    </ScrollView>
  )
}

export default CampShow
const COLORS = {
  white: '#FFF',
  dark: '#000',
  primary: '#52c0b4',
  secondary: '#e0f4f1',
  light: '#f0f0f0',
  grey: '#908e8c',
  orange: '#f5a623',
  green: '#00B761',
};
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  HeaderImage: {
    width:"100%",
    height: 400,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",

    
},
Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 20,
},
IconContainer: {
  position: "absolute",
  width: 60,
  height: 60,
  backgroundColor: COLORS.primary,
  top: -40,
  right: 10,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
},
Btn: {
  height: 65,
  width:"95%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
  backgroundColor: COLORS.primary,
  marginHorizontal: 20,
  borderRadius: 10,
  marginBottom:10
},
editBtn: {
  height: 40,
  width:"30%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
  backgroundColor: COLORS.grey,
  // marginHorizontal: 20,
  marginRight:10,
  borderRadius: 10
},
deleteBtn: {
  height: 40,
  width:"30%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
  backgroundColor: '#B73F39',
  // marginHorizontal: 20,
  borderRadius: 10
},
CardImage: {
  width: 350,
  height: 200,
  marginTop:7,
  // borderTopLeftRadius: 15,
  // borderTopRightRadius: 15,
  borderRadius:15
},
  // container: {
  //   backgroundColor: 'white',
  //   borderRadius: 8,
  //   width: 300,
  //   // paddingBottom: 40,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.29,
  //   shadowRadius: 4.65,
  //   elevation: 7,
  // },
  // image: {
  //   width: 300,
  //   height: 300,
  // },
  // header: {
  //   color: "#222",
  //   fontSize: 28,
  //   fontWeight: "bold",
  //   paddingLeft: 20,
  //   paddingTop: 20
  // },
  // body: {
  //   color: "#222",
  //   fontSize: 18,
  //   paddingLeft: 20,
  //   paddingLeft: 20,
  //   paddingRight: 20
  // }
})