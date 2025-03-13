import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  iconLeft?: any;
  iconRight?: any;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  leftIconSize?: number;
  rightIconSize?: number;
  iconLeftColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftComponent,
  centerComponent,
  rightComponent,
  iconLeft,
  iconRight,
  onPressLeft,
  onPressRight,
  leftIconSize = 30,
  rightIconSize = 30,
  iconLeftColor = 'black',
}) => {
  const navigation = useNavigation();

  const renderLeft = () => (
    leftComponent || (
      <View style={headerStyles.side}>
        {iconLeft ? (
          <Pressable hitSlop={15} onPress={onPressLeft || navigation.goBack}>
            <Image
              source={iconLeft}
              style={{ width: leftIconSize, height: leftIconSize, tintColor: iconLeftColor }}
              resizeMode='contain'
            />
          </Pressable>
        ) : (
          <View style={{ width: leftIconSize, height: leftIconSize }} />
        )}
      </View>
    )
  );

  const renderCenter = () => (
    centerComponent || (
      <View style={headerStyles.center}>
        <Text style={headerStyles.title}>{title}</Text>
      </View>
    )
  );

  const renderRight = () => (
    rightComponent ? rightComponent : (
      <View style={headerStyles.side}>
        {iconRight ? (
          <Pressable hitSlop={15} onPress={onPressRight}>
            <Image
              source={iconRight}
              style={{ width: rightIconSize, height: rightIconSize , borderRadius:10}}
              resizeMode='contain'
            />
          </Pressable>
        ) : (
          <View style={{ width: rightIconSize, height: rightIconSize }} />
        )}
      </View>
    )
  );

  return (
    <View style={headerStyles.header}>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#eee',
    width: '100%',
  },
  side: {
    flex: 1,
    alignItems: 'flex-start', 
    paddingStart: 30,
  },
  center: {
    flex: 3,
    alignItems: 'center', 
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          title="Header"
          iconLeft={{ uri: 'https://static.thenounproject.com/png/636010-200.png' }}
          onPressLeft={() => console.log('Back Pressed')}
          iconRight={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.A-SsGAafOECzNfQwjwkTUgHaHa&pid=Api&P=0&h=220' }}
          onPressRight={() => console.log('Right Pressed')} leftComponent={undefined} centerComponent={undefined} rightComponent={undefined}        />

        <Header
          title="Trang chu"
          iconLeft={{ uri: 'https://static.thenounproject.com/png/636010-200.png' }}
          onPressLeft={() => console.log('Back Pressed')} leftComponent={undefined} centerComponent={undefined} rightComponent={undefined} iconRight={undefined} onPressRight={undefined}        />

        <Header
          iconLeft={{ uri: 'https://static.thenounproject.com/png/636010-200.png' }}
          onPressLeft={() => console.log('Back Pressed')} title={undefined} leftComponent={undefined} centerComponent={undefined} rightComponent={undefined} iconRight={undefined} onPressRight={undefined}        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});