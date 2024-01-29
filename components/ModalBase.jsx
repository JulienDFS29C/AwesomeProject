import {Alert, Modal, Pressable, StyleSheet, Text, View} from "react-native";

export const ModalBase = props =>
    (

<Modal
    animationType="slide"
    transparent={true}
    visible={props.modVisible}
    onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        {props.setModVisible(!props.modVisible)}
    }}>
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.modalText}>Confirmez la suppression</Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {props.modFunction(props.goals)} } >
                <Text style={styles.textStyle}>OK</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {props.setModVisible(!props.modVisible)} }>
                <Text style={styles.textStyle}>CANCEL</Text>
            </Pressable>
        </View>
    </View>
</Modal>
    )



const styles = StyleSheet.create({

button: {
    borderRadius: 20,
        padding: 10,
        elevation: 2,
},
buttonOpen: {
    backgroundColor: '#F194FF',
},
buttonClose: {
    backgroundColor: '#2196F3',
},
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },

        modalEditView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },

    }
);