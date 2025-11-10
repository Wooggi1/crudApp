import { StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Styles = {
  card: ViewStyle;
  cardImage: ImageStyle;
  cardContent: ViewStyle;
  cardTitle: TextStyle;
  cardArtist: TextStyle;
};

export default StyleSheet.create<Styles>({
  card: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardArtist: {
    fontSize: 14,
    color: '#666',
  },
});