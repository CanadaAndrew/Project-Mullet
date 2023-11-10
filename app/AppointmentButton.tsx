import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AppointmentButtonProps {
  appointmentTime: string;
  onAppointmentPress: (time: string) => void;
}

interface AppointmentButtonState {
  isPressed: boolean;
}

class AppointmentButton extends Component<AppointmentButtonProps, AppointmentButtonState> {
  constructor(props: AppointmentButtonProps) {
    super(props);

    this.state = {
      isPressed: false,
    };
  }

  handleButtonPress = () => {
    this.setState((prevState) => ({ isPressed: !prevState.isPressed }), () => {
      const { appointmentTime, onAppointmentPress } = this.props;
      if (onAppointmentPress) {
        onAppointmentPress(appointmentTime);
      }
    });
  }

  render() {
    const { isPressed } = this.state;

    return (
      <TouchableOpacity
      style={[ styles.button, { backgroundColor: 'white' },
      ]}
        onPress={this.handleButtonPress}
      >
        <Text style={[styles.buttonText, { color: isPressed ? 'red' : 'green' }]}>
          {this.props.appointmentTime} {/*red button times should be removed from array to be sent to db*/}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentButton;
