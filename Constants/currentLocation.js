import * as Location from "expo-location";

export async function currentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return "Permission denied";
  }

  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  return location;
}

export async function getAddress(lat, lng) {
  console.log(lat, lng);
  let { status } = await Location.requestForegroundPermissionsAsync(); // Get the location permission from the user and extract the 'status' key from it.
  if (status !== "granted") {
    alert("permission denied!");
    return;
  }
  const response = await Location.reverseGeocodeAsync({
    latitude: lat,
    longitude: lng,
  });
  const address = `${(response[0].city)}, ${response[0].region}`;
  return address;
}
