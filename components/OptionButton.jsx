import {Text, TouchableOpacity} from "react-native";


export const OptionButton = props =>(
<TouchableOpacity

    onPress={() => {

        {props.function(props.element)}
    }}
 >
    <Text >{props.doThat}</Text>
</TouchableOpacity>
)

