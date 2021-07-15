import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Modal, ScrollView, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { AplicationState } from '~/store';
import { addPostRequest } from '~/store/modules/post/actions';

import {
  Container,
  ContainerModal,
  ContentModal,
  Card,
  ButtonSavePost,
  Input,
  Header,
  TextSavePost,
  TextTitleModal,
} from './styles';
import { User } from '~/store/modules/user/types';

const AddPost: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const stateUser = useSelector((state: AplicationState) => state.user);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [user, setUser] = useState({} as User);
  const [open, setOpen] = useState(false);

  const handleSubmitAddPost = useCallback(() => {
    dispatch(
      addPostRequest({
        title,
        body,
        userId: user.id,
      }),
    );

    navigation.goBack();
  }, [title, body, user, dispatch, navigation]);

  const handleReturn = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={handleReturn}>
          <Icon name="close" size={30} color="#9e4bfb" />
        </TouchableOpacity>

        <ButtonSavePost onPress={handleSubmitAddPost}>
          <TextSavePost>Postar</TextSavePost>
        </ButtonSavePost>
      </Header>

      <Input
        placeholder="Titulo"
        autoFocus
        multiline
        numberOfLines={2}
        maxLength={200}
        onChangeText={setTitle}
        value={title}
      />

      <Input
        placeholder="Descrição"
        multiline
        numberOfLines={4}
        maxLength={400}
        onChangeText={setBody}
        value={body}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Input
          placeholder="Autor"
          value={user.name}
          editable={false}
          style={{ flex: 1, marginBottom: 0, height: 40 }}
        />

        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{ marginLeft: 6 }}
        >
          <Icon name="search-circle-outline" size={40} color="#111" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={() => setOpen(false)}
        statusBarTranslucent
      >
        <ContainerModal>
          <ContentModal>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <TextTitleModal>Escolha o autor</TextTitleModal>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Icon name="close" size={30} color="#111" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {stateUser.data.map((user) => (
                <Card
                  key={String(user.id)}
                  onPress={() => {
                    setUser(user);
                    setOpen(false);
                  }}
                >
                  <Text>{user.name}</Text>
                  <Text>{user.email}</Text>
                </Card>
              ))}
            </ScrollView>
          </ContentModal>
        </ContainerModal>
      </Modal>
    </Container>
  );
};

export { AddPost };
