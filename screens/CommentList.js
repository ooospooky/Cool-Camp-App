import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import StarRating from 'react-native-star-rating';

const CommentList = ({ route }) => {
  let userInfo;
  let accessToken;

  if (route.params) {
    if (route.params.userInfo) {
      userInfo = route.params.userInfo;
      accessToken = route.params.accessToken;
    }
  }
  function checkCommentExist() {
    if (route.params.data.comment.length === 0) {
      return (
        <View>
          <Text>
            There is no comment yet.
          </Text>
        </View>
      )
    } else {
      return route.params.data.comment.map((comment) => {
        return (
          <View style={styles.commentContainer} key={comment.id}>
            <View style={{ marginRight: 10 }}>
              <Image style={{ height: 50, width: 50 }} source={{ uri: comment.img }}></Image>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", }}>
                <Text>{comment.author}</Text>
                <StarRating
                  starSize={15}
                  disabled={true}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half-sharp'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  rating={comment.rating}
                  fullStarColor={'#f5a623'}
                  emptyStarColor={'#908e8c'}
                />
              </View >
              {/* <Text>{comment.comment}</Text> */}
              <View style={{ flexDirection: "row", width: 180 }}>
                <Text style={{ flex: 1, flexWrap: 'nowrap' }}>{comment.comment}</Text>
              </View>
            </View>
          </View>
        )
      })
    }
  }
  function renderStar(data) {
    if (route.params.data.comment.length === 0) {
      return null
    } else {
      // 計算平均分數/////////////////////////////////////////////////////////////////////////////////
      let total = 0;
      let bathroom = 0
      let view = 0
      for (let i = 0; i < data.comment.length; i++) {
        total += data.comment[i].rating
        bathroom += data.comment[i].bathroomrating
        view += data.comment[i].viewrating
      }
      let average = total / data.comment.length;
      let bathroomAverage = bathroom / data.comment.length
      let viewAverage = view / data.comment.length
      ///////////////////////////////////////////////////////////////////////////////////
      return (
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "column", marginTop: 10 }}>
              <StarRating

                starSize={20}
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
              <Text style={{ marginTop: 8, marginLeft: 20 }}>{data.comment.length}則留言</Text>
            </View>
            <Text style={{ color: '#908e8c', fontSize: 20 }}>
              <Text style={{ fontSize: 30 }}>{average.toFixed(1)}</Text>/5
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10, justifyContent: "center" }}>
            <Text style={{ marginBottom: 5 }}>景觀平均分數:&nbsp;&nbsp;&nbsp;
              <StarRating
                starSize={17}
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half-sharp'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={viewAverage}
                fullStarColor={'#f5a623'}
                emptyStarColor={'#908e8c'}
              />
            </Text>
            <Text>浴廁平均分數:&nbsp;&nbsp;&nbsp;
              <StarRating
                starSize={17}
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half-sharp'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={bathroomAverage}
                fullStarColor={'#f5a623'}
                emptyStarColor={'#908e8c'}
              />
            </Text>
          </View>
        </View>
      )
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: '#fff', paddingBottom: 20, minHeight: '100%' }}>
      <View style={styles.maincontainer}>
        {renderStar(route.params.data)}
        {checkCommentExist()}
      </View>
    </ScrollView>
  )
}

export default CommentList

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentContainer: {
    width: '90%',
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 10,
    borderColor: '#52c0b4',
    borderRadius: 20,
    marginTop: 15
  }

})


