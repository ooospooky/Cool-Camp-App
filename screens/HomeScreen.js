import { StyleSheet, ScrollView, Text, View,Style,TouchableOpacity, Animated, Image, } from 'react-native'
import React,{useEffect,useState} from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons';
import {db} from '../firebase-config'
import  {collection, getDocs,setDoc, getDoc, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';
const HomeScreen = ({ navigation,route}) => {
  if(route.params)console.log('route',route.params);
  let userInfo;
  let accessToken;

  if(route.params){
    if(route.params.userInfo){
      console.log('HOme access ',route.params.accessToken)
      userInfo = route.params.userInfo;
      accessToken = route.params.accessToken;
    }
   
  }



  const [campData,setCampData]  = useState([])
  const [item,setItem]  = useState('')
  useEffect(async()=>{
    // if(route.params){
    //   if(route.params.userInfo){
    //     console.log('HOme access ',route.params.accessToken)
    //     userInfo = route.params.userInfo;
    //     accessToken = route.params.accessToken;
    //   }

    // }
    const campCollectionRef = collection(db,'camp')
    const data = await getDocs(campCollectionRef);
    const response =  data.docs.map((doc)=> ({...doc.data(),id:doc.id}));
    setCampData(response)
   
  
  },[route])    //[route] to check if data change,if true it will rerender list



  console.log('userInfo',userInfo)
  
  return (
   <ScrollView>
    <View style={styles.container}>
    {/* <View> */}
      <Text>{userInfo?userInfo.name : ''}</Text>

      {/* Login page */}
      <TouchableOpacity
        onPress={() => navigation.navigate('會員中心',{userInfo:userInfo,accessToken:accessToken})}
        >

          <Text style={{color:'red'}}>會員中心</Text>
      </TouchableOpacity>
   
      {/* List camp */}
      {campData.map((data)=>{
        return (
          <View key={data.id} style={{margin:40}} >
            <TouchableOpacity onPress={() => navigation.navigate('CampDetail',{data:data,userInfo:userInfo,accessToken:accessToken})}>
            
            <Image
              // source={{uri:"https://lh3.googleusercontent.com/a-/AOh14GjAsH0iUufyLRWc5-u6lWW8goMQwC445hiVDIwUrQ=s96-c"}}
              source={data.imageData[0]?{uri:data.imageData[0]['url']} :{uri:"https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"} }
              style={styles.CardImage}
              resizeMode={'cover'}
            />
               <Text>{data.title}</Text>  
                {/* 白簡介 */}
               <View style={styles.CardDetails}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            {/* 飯店名稱 */}
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>{data.title}</Text>
                            {/* 地址 */}
                            <Text style={{ fontSize: 12, color: COLORS.grey }}>{data.location}</Text>
                        </View>
                        <Icon name="bookmark-border" size={26} color={COLORS.primary} />
                    </View>
                    {/* 飯店評價星數 點閱數 */}
                    {/* 可改善的地方: 星數 跟瀏覽數 做成api 控制輸出 */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{backgroundColor:'#BCBAB8',padding:4,borderRadius:10,overflow: 'hidden',marginRight:4}}>{data.locationTag?data.locationTag:""}</Text>
                          <Text style={{backgroundColor:'#BCBAB8',padding:4,borderRadius:10,overflow: 'hidden'}}>{data.advantageTag?data.advantageTag:""}</Text>
                            {/* <Icon name="star" size={15} color={COLORS.orange} />
                            <Icon name="star" size={15} color={COLORS.orange} />
                            <Icon name="star" size={15} color={COLORS.orange} />
                            <Icon name="star" size={15} color={COLORS.orange} />
                            <Icon name="star" size={15} color={COLORS.grey} /> */}
                        </View>
                        <Text style={{ fontSize: 10, color: COLORS.grey }}>365reviews</Text>
                    </View>
                </View>

            </TouchableOpacity>
         </View>
        )
      })}



      {/* Create Camp */}
       <TouchableOpacity
       style={{margin:40}}
        onPress={() => navigation.navigate('CampCreate')}
        >
          <Text>CreateCamp</Text>
        </TouchableOpacity>

    </View>
    </ScrollView>
//     <View style={styles.container}>
//     <Animated.View style={{ ...styles.Card }}>
//     {/* 卡片 半透明變色 遮罩 */}
//     <Animated.View style={{ ...styles.CardOverLay }} />
//     {/* 右上角 價錢標籤 */}
//     <View style={styles.PriceTag}>
//         <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}>123</Text>
//     </View>
//     {/* 房間圖片 */}
//     <Image
//         source="https://lh3.googleusercontent.com/a-/AOh14GjAsH0iUufyLRWc5-u6lWW8goMQwC445hiVDIwUrQ=s96-c"
//         style={styles.CardImage}
//     />
//     {/* 房間簡介 */}
//     <View style={styles.CardDetails}>
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//             <View>
//                 {/* 飯店名稱 */}
//                 <Text style={{ fontSize: 17, fontWeight: "bold" }}>dgdios</Text>
//                 {/* 地址 */}
//                 <Text style={{ fontSize: 12, color: COLORS.grey }}>Tapei</Text>
//             </View>
//             <Icon name="bookmark-border" size={26} color={COLORS.primary} />
//         </View>
//         {/* 飯店評價星數 點閱數 */}
//         {/* 可改善的地方: 星數 跟瀏覽數 做成api 控制輸出 */}
//         <View style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginTop: 10,
//         }}>
//             <View style={{ flexDirection: 'row' }}>
//                 <Icon name="star" size={15} color={COLORS.orange} />
//                 <Icon name="star" size={15} color={COLORS.orange} />
//                 <Icon name="star" size={15} color={COLORS.orange} />
//                 <Icon name="star" size={15} color={COLORS.orange} />
//                 <Icon name="star" size={15} color={COLORS.grey} />
//             </View>
//             <Text style={{ fontSize: 10, color: COLORS.grey }}>365reviews</Text>
//         </View>
//     </View>
// </Animated.View>

// </View >
  )
}
// const styles = StyleSheet.create({})
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header: {
    flexDirection: "row",
    marginTop: 20,
    // 畫面兩個物件要左右頭尾放 用space-between
    justifyContent: "space-between",
    paddingHorizontal: 20,
},
SearchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center"
},
CategoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 30,
},
CategoryListText: {
    fontSize: 17,
    fontWeight: "bold",
},
Card: {
    // width: CardWidth,
    width: 300,
    height: 280,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
},
PriceTag: {
    width: 80,
    height: 60,
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",

},
CardImage: {
    width: 300,
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
},
CardDetails: {
    width: "100%",
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.light,
    position: "absolute",
    // top:50,
    bottom: -50,
    padding: 20,
},
CardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    // width: CardWidth
    width:300
},
TopHotelCard: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
},
TopHotelCardImage: {
    width: "100%",
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
}
})
export default HomeScreen

