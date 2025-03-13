import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface EventItemProps {
  label?: string;
  content: string;
}

interface SectionContentProps {
  title?: string;
  items: EventItemProps[];
  image?: string;
  showButton?: boolean;
  onButtonPress?: () => void;
}

interface SectionProps {
  data: SectionContentProps;
  index: number;
}

const EventItem: React.FC<{ item: EventItemProps }> = ({ item }) => (
  <View style={styles.itemContainer}>
    {item.label && <Text style={styles.itemLabel}>{item.label}</Text>}
    <Text style={styles.itemContent}>{item.content}</Text>
  </View>
);

const Section: React.FC<SectionProps> = ({ data, index }) => (
  <View key={index} style={styles.sectionContainer}>
    {data.title && <Text style={styles.sectionTitle}>{data.title}</Text>}
    <View style={styles.sectionContent}>
      <FlatList
        data={data.items}
        renderItem={({ item }) => <EventItem item={item} />}
        keyExtractor={(item, idx) => idx.toString()}
      />
      {data.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: data.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
      {data.showButton && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Details pressed')}
        >
          <Text style={styles.buttonText}>CHI TIẾT</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const SectionView: React.FC = () => {
  const eventInfo: SectionContentProps[] = [
    {
      title: 'Lịch trình',
      items: [
        { label: 'Địa điểm:', content: 'Hồ Tràm, Vũng Tàu' },
        { label: 'Thời gian:', content: '09:00 AM - 12:00 AM, 12/12/2024' },
        { label: 'Phương tiện di chuyển:', content: 'Xe bus' },
        { label: 'Thời gian:', content: '21:00 - 22:00' },
      ],
      image: 'data:image/jpeg;base64,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',
    },
    {
      title: 'Khách sạn',
      items: [
        { label: 'Tên khách sạn:', content: 'Hồng Quỳnh' },
        { label: 'Giờ mở cửa:', content: '06:00 AM - 12:00 AM' },
        { label: 'Địa điểm:', content: '234 Quang Trung, Hồ Chí Minh' },
      ],
      showButton: true,
    },
  ];

  const renderSection = useCallback(
    ({ item, index }: { item: SectionContentProps; index: number }) => <Section data={item} index={index} />,
    []
  );

  return (
    <FlatList
      data={eventInfo}
      renderItem={renderSection}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container} // Đảm bảo nội dung không bị dính sát vào nhau
    />
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainer: {
    marginBottom: 12,
  },
  itemLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemContent: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  imageContainer: {
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#0099ff',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SectionView;
