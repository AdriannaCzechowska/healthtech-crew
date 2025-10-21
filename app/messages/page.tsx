"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Send, ArrowLeft, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import type { Message } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";

export default function MessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: api.getMessages,
  });

  const markAsReadMutation = useMutation({
    mutationFn: api.markMessageAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (message.unread) {
      markAsReadMutation.mutate(message.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with your healthcare providers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Message List */}
            <Card className="md:col-span-1 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Inbox</h2>
                <Button size="sm" className="rounded-xl">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>

              <div className="space-y-2">
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading messages...
                  </div>
                ) : messages && messages.length > 0 ? (
                  messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => handleSelectMessage(message)}
                      className={`p-3 rounded-xl cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id
                          ? "bg-primary text-primary-foreground"
                          : message.unread
                          ? "bg-secondary/20 border-2 border-secondary"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm">{message.from}</p>
                        {message.unread && (
                          <div className="h-2 w-2 rounded-full bg-secondary" />
                        )}
                      </div>
                      <p className="text-sm font-medium mb-1">{message.subject}</p>
                      <p className="text-xs opacity-80 line-clamp-1">
                        {message.snippet}
                      </p>
                      <p className="text-xs opacity-60 mt-1">{message.time}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No messages
                  </div>
                )}
              </div>
            </Card>

            {/* Message Content */}
            <Card className="md:col-span-2 rounded-2xl p-6">
              {selectedMessage ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setSelectedMessage(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">
                          From: {selectedMessage.from}
                        </p>
                        <Badge variant="secondary" className="rounded-full text-xs">
                          {selectedMessage.time}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">
                      {selectedMessage.content || selectedMessage.snippet}
                    </p>
                  </div>

                  {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Attachments:</p>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                          >
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm">{attachment}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Type your reply..."
                      className="rounded-xl min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button className="rounded-xl">
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No message selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a message from the inbox to view its content
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

