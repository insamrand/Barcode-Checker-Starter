import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Right,
  Left,
  Button,
  Icon,
  Text,
  Body
} from "native-base";

import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import actions from "../../redux/actions";

export class ScanPage extends Component {
  state = {
    hasCameraPermission: null,
    scanned: false
  };

  closePopUp = () => {
    this.props.navigation.goBack();
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    // this.props.barcodeScanned('1234567');
    // this.closePopUp();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  handleBarCodeScanned = ({ type, data }) => {
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );

    // ส่งข้อมูลเป็น action ผ่าน dispatch function เพื่อส่งเข้า redux store
    this.props.barcodeScanned(data);

    // ปิดหน้า Scan
    this.closePopUp();
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;
    let scanPad;

    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if (!scanned) {
      scanPad = (
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else {
      scanPad = <View></View>;
    }

    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Title>Scanner</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.closePopUp}>
              <Icon name="close" />
            </Button>
          </Right>
        </Header>

        <View style={{ flex: 1 }}>{scanPad}</View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    barcodeScanned: barcodeData => actions.barcodeScanned(dispatch, barcodeData) // เห็นที่เราส่ง dispatch เข้าไปใน action function ไหม?
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanPage);
