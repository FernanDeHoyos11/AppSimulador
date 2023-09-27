import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    alignContent: "center",
    padding: 16,
    backgroundColor: '#F8F8F8'
  },
  view: {
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  input: {
    marginTop: 10,
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: "#1DD1CB",
    marginTop: 10,
    marginBottom: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    position: 'absolute',
    bottom: 25,
    right: 16,
  },
  fabDiv: {
    width: 50,
    height: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
});
