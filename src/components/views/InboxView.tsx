import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Hash, Plus, Lock, User } from 'lucide-react';
import { useInboxContext } from '../../context/InboxContext';
import { useAppContext } from '../../context/AppContext';

export const InboxView: React.FC = () => {
  const { channels, messages, activeChannelId, setActiveChannelId, createChannel, sendMessage } = useInboxContext();
  const { users } = useAppContext();
  const [newChannelName, setNewChannelName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const activeChannel = channels.find(c => c.id === activeChannelId);
  const activeMessages = messages.filter(m => m.channelId === activeChannelId);

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      createChannel(newChannelName, 'private', selectedUserIds);
      setNewChannelName('');
      setSelectedUserIds([]);
    }
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(activeChannelId, newMessage, 1); // Assuming senderId 1 (Founder)
      setNewMessage('');
    }
  };

  return (
    <div className="h-full w-full flex bg-slate-950 text-slate-200">
      {/* Sidebar - Channels */}
      <div className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-semibold text-white">Channels</h2>
          <button onClick={handleCreateChannel} className="p-1 hover:bg-white/10 rounded">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="p-2">
          <input 
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            placeholder="New channel name"
            className="w-full p-2 bg-white/5 rounded text-sm mb-2"
          />
          <div className="space-y-1 mb-2">
            {users.map(user => (
              <button
                key={user.id}
                onClick={() => toggleUserSelection(user.id)}
                className={`w-full flex items-center gap-2 p-2 text-xs rounded ${selectedUserIds.includes(user.id) ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-white/5'}`}
              >
                <User className="w-3 h-3" />
                {user.name}
              </button>
            ))}
          </div>
          <button onClick={handleCreateChannel} className="w-full p-2 bg-indigo-600 rounded text-sm font-medium mb-4">Create Channel</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => setActiveChannelId(channel.id)}
              className={`w-full flex items-center gap-2 p-3 text-sm ${activeChannelId === channel.id ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-white/5'}`}
            >
              {channel.type === 'private' ? <Lock className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
              {channel.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Messages */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <Hash className="w-5 h-5" />
            {activeChannel?.name}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeMessages.map(msg => (
            <div key={msg.id} className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">{msg.timestamp}</div>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${activeChannel?.name}`}
              className="flex-1 p-2 bg-white/5 rounded text-sm"
            />
            <button onClick={handleSendMessage} className="px-4 py-2 bg-indigo-600 rounded text-sm font-medium">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
