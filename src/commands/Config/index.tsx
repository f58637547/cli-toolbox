import { Badge, TextInput } from '@inkjs/ui';
import { Text } from 'ink';
import SelectInput from 'ink-select-input';
import React, { useState } from 'react';
import { TabsWithHeader, TabsWithHeaderItem } from '../../components';
import configStore from '../../constants/config';

const Config: React.FC = () => {
  const [tab, setTab] = useState<string>('home');
  const emojiFormatConfig = configStore.get('emojiFormat');
  const openaiTokenConfig = configStore.get('openaiToken');
  const apiBaseUrlConfig = configStore.get('apiBaseUrl');
  const githubTokenConfig = configStore.get('githubToken');

  const selection: any = [
    {
      label: (
        <Text>
          {`Emoji Format `}
          <Badge color="blue">{emojiFormatConfig ? 'emoji' : 'code'}</Badge>
        </Text>
      ),
      value: 'emojiFormat',
    },
    {
      label: (
        <Text>
          {`OpenAI Token `}
          {openaiTokenConfig ? <Badge color="green">set</Badge> : <Badge color="red">unset</Badge>}
        </Text>
      ),
      value: 'openaiToken',
    },
    {
      label: (
        <Text>
          {`OpenAI API Proxy `}
          {apiBaseUrlConfig ? (
            <Badge color="green">modify</Badge>
          ) : (
            <Badge color="blue">default</Badge>
          )}
        </Text>
      ),
      value: 'apiBaseUrl',
    },
    {
      label: (
        <Text>
          {`Github Token `}
          {githubTokenConfig ? <Badge color="green">set</Badge> : <Badge color="red">unset</Badge>}
        </Text>
      ),
      value: 'githubToken',
    },
  ];

  const items: TabsWithHeaderItem[] = [
    {
      title: '🤯 Lobe Commit Config',
      key: 'home',
      children: <SelectInput items={selection} onSelect={(item: any) => setTab(item.value)} />,
    },
    {
      title: '🤯 Emoji Format Setting',
      key: 'emojiFormat',
      children: (
        <SelectInput
          items={[
            {
              label: '😄',
              value: 'emoji',
            },
            {
              label: ':smile:',
              value: 'code',
            },
          ]}
          onSelect={(item: any) => {
            configStore.set('emojiFormat', item.value === 'emoji');
            setTab('home');
          }}
        />
      ),
    },
    {
      title: '🤯 OpenAI Token Setting',
      key: 'openaiToken',
      children: (
        <TextInput
          placeholder="Input OpenAI token..."
          defaultValue={openaiTokenConfig}
          onSubmit={(token) => {
            configStore.set('openaiToken', token);
            setTab('home');
          }}
        />
      ),
    },
    {
      title: '🤯 OpenAI API Proxy',
      key: 'apiBaseUrl',
      children: (
        <TextInput
          placeholder="Set openAI api proxy, default value: https://api.openai.com/v1/..."
          defaultValue={apiBaseUrlConfig}
          onSubmit={(url) => {
            configStore.set('apiBaseUrl', url);
            setTab('home');
          }}
        />
      ),
    },
    {
      title: '🤯 Github Token Setting',
      key: 'githubToken',
      children: (
        <TextInput
          placeholder="Input Github token..."
          defaultValue={githubTokenConfig}
          onSubmit={(token) => {
            configStore.set('githubToken', token);
            setTab('home');
          }}
        />
      ),
    },
  ];
  return <TabsWithHeader items={items} activeKey={tab} />;
};

export default Config;
