import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';

function WeatherScreen({ navigation, route }) {
    const data = route.params;
    const [weatherData, setWeatherData] = useState();

    const lat = data !== undefined && data.data.coord.lat
    const long = data !== undefined && data.data.coord.lon

    const getDate = new Date()
    console.log(`========`, getDate.getDay());
    console.log(`========`, getDate.getFullYear());
    console.log(`========`, getDate.getDate());

    function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();    
  return isNaN(dayOfWeek) ? null : 
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

    useEffect(() => {
        async function getWeatherData() {
            let API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=9ae2447983447457a57564703f4382ac`
            try {
                await fetch(API)
                    .then(response => response.json())
                    .then(data => {
                        setWeatherData(data)
                    })
            } catch (error) {
                console.error(error);
            }

        }
        getWeatherData();
    }, [lat, long])

   console.log(`weatherData================`, weatherData);
   console.log(`weatherData================`, weatherData.weather[0].main);

    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <View style={[styles.container]}>
                    <View style={{
                        flex: 1
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "700"
                        }}>Current Weather</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around"
                        }}>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: "500"
                                }}>Denver</Text>
                                <Feather name="chevron-down" size={24} color="white" />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 24,
                                    fontWeight: "500",
                                    padding: 8
                                }}>{weatherData.cod === 400 ? "NA" : weatherData.main.temp}&deg;C</Text>
                                <View style={{
                                    alignItems: "center"
                                }}>
                                    <Feather name="sun" size={24} color="black" />
                                    <Text style={{
                                        color: "white",
                                        fontSize: 16,
                                    }}>{weatherData.cod === 400 ? "NA" : weatherData.weather[0].main}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}>
                            <View style={{
                                alignItems: "center"
                            }}>
                                <Feather name="cloud-snow" size={24} color="black" />
                                <Text>Cloudy</Text>
                            </View>
                            <View style={{
                                alignItems: "center"
                            }}>
                                <Feather name="sun" size={24} color="black" />
                                <Text>Sunny</Text>
                            </View>
                            <View style={{
                                alignItems: "center"
                            }}>
                                <Feather name="sun" size={24} color="black" />
                                <Text>Sunny</Text>
                            </View>
                            <View style={{
                                alignItems: "center"
                            }}>
                                <Feather name="sun" size={24} color="black" />
                                <Text>Sunny</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: "white",
                        padding: 8,
                        borderRadius: 12
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-around"
                        }}>
                            <Text style={{
                                color: "aqua",
                                fontSize: 18,
                                fontWeight: "500"
                            }}>{getDate.getDate()}</Text>
                            <Feather name="calendar" size={24} color="black" />
                        </View>
                        <Text style={{
                            color: "black",
                            fontWeight: "700"
                        }}>{getDayOfWeek(getDate)}, {getDate.getFullYear()}</Text>
                    </View>
                </View>

                <Button title='Select City' onPress={() => navigation.navigate("CitySelectionScreen")} />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "red",
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
    },

    container: {
        backgroundColor: "aqua",
        padding: 14,
        flexDirection: "row",
        alignItems: "center"
    },
});

export default WeatherScreen;