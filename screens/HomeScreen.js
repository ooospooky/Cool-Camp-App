import { StyleSheet, ScrollView, Text, View,Style,TouchableOpacity, Animated, Image, } from 'react-native'
import React,{useEffect,useState} from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
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

    const campCollectionRef = collection(db,'camp')
    const data = await getDocs(campCollectionRef);
    const response =  data.docs.map((doc)=> ({...doc.data(),id:doc.id}));
    setCampData(response)
   
  
  },[route])    //[route] to check if data change,if true it will rerender list

  function renderAverageStar(data){
    if(!data.comment || data.comment.length===0){
        return(
          <View>
            <Text style={{color: COLORS.grey}}>
              Not rated yet.
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
          <View>
           <Text style={{color: COLORS.grey}}> 
             <Text style={{ fontSize: 20 }}>{average.toFixed(1)}</Text>/5
            </Text>
          </View> 
        )
      }
    }

  console.log('userInfo',userInfo)
  
  return (
   <ScrollView>
    <View style={styles.container}>
    {/* <View> */}

      {/* Login page */}
      <TouchableOpacity style={{marginTop:10,padding:10,borderRadius: 30,backgroundColor:COLORS.primary}}
        onPress={() => navigation.navigate('會員中心',{userInfo:userInfo,accessToken:accessToken})}
        >
          <Text style={{color:'#fff'}}><IconAnt name="user" size={17}  />會員中心</Text>
      </TouchableOpacity>
      <Text style={{marginTop:10}}>{userInfo?`Welcome ${userInfo.name}`: ''}</Text>
   
      {/* List camp */}
      {campData.map((data)=>{
  
        return (
          <View key={data.id} style={{marginBottom:60,marginTop:20}} >
            <TouchableOpacity onPress={() => navigation.navigate('CampDetail',{data:data,userInfo:userInfo,accessToken:accessToken})}>
            
            <Image
              // source={{uri:"https://lh3.googleusercontent.com/a-/AOh14GjAsH0iUufyLRWc5-u6lWW8goMQwC445hiVDIwUrQ=s96-c"}}
              source={data.imageData[0]?{uri:data.imageData[0]['url']} :{uri:"https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"} }
              style={styles.CardImage}
              resizeMode={'cover'}
            />
               <Text>{data.title}</Text>  
                {/* 簡介 */}
               <View style={styles.CardDetails}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            {/* 名稱 */}
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
                        {renderAverageStar(data)}
                        {/* <Text style={{ fontSize: 10, color: COLORS.grey }}>365reviews</Text> */}
                    </View>
                </View>

            </TouchableOpacity>
         </View>
        )
      })}



      {/* Create Camp */}
      {userInfo?
       <TouchableOpacity
       style={styles.Btn}
        onPress={() => navigation.navigate('CampCreate',{userInfo:userInfo,accessToken:accessToken})}
        >
          <Text>建立露營地</Text>
        </TouchableOpacity>
      : null} 
    </View>
    </ScrollView>
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
    paddingBottom:60
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
},
Btn: {
  height: 55,
  width:'45%',
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: COLORS.primary,
  marginHorizontal: 20,
  borderRadius: 10,
  margin:30
},
})
export default HomeScreen

