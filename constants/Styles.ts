import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from './Colors';

const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 5,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.primary,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  // Primary button
  button: {
    backgroundColor: Colors.light.accent,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.accent,
  },
  buttonText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  // Outline button
  buttonOutline: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.accent,
  },
  buttonOutlineText: {
    color: Colors.light.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  // Success button
  buttonSuccess: {
    backgroundColor: Colors.light.accent,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.accent,
  },
  buttonSuccessText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.light.input,
    borderRadius: 5,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  badge: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: Colors.light.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 5,
    marginVertical: 4,
  },
  listItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: Colors.light.textDim,
    marginTop: 4,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.light.card,
    borderRadius: 5,
    padding: 20,
    width: width * 0.9,
    maxWidth: 400,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  // Form styles
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.light.textDim,
    marginBottom: 8,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    marginTop: 4,
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textDim,
    textAlign: 'center',
    marginTop: 12,
  },
  // Image styles
  homeImage: {
    width: width > 768 ? 600 : width * 0.9,
    height: 300,
    maxHeight: 400,
    minHeight: 300,
    marginVertical: 20,
    alignSelf: 'center',
  },
  trainerImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    padding: 16,
  },
}); 