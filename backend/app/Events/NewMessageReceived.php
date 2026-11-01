<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NewMessageReceived implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public Message $message;

    public function __construct(Message $message)
    {
        Log::info('Event created', ['id' => $message->id]);

        $this->message = $message;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('admin.messages'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'new-message';
    }

    public function broadcastWith(): array
    {
        return [
            'message' => [
                'id' => $this->message->id,
                'name' => $this->message->name,
                'email' => $this->message->email,
                'title' => $this->message->title,
                'message' => $this->message->message,
                'status' => $this->message->status,
            ],
        ];
    }
}
