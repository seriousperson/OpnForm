<?php

namespace App\Listeners\Forms;

use App\Events\Models\FormIntegrationsEventCreated;
use App\Mail\Forms\FormIntegrationsEventCreationConfirmationMail;
use App\Models\Integration\FormIntegrationsEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class FormIntegrationsEventListener implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(FormIntegrationsEventCreated $event)
    {
        if ($event->formIntegrationsEvent->status === FormIntegrationsEvent::STATUS_ERROR) {
            $form = $event->formIntegrationsEvent->integration->form;
            //to-do:: need to fix
            Log::debug("FormIntegrationsEventListner.php: ", ['creator email' => $form->creator->email]);
            Mail::to('moustaphacreator@gmail.com')->send(new FormIntegrationsEventCreationConfirmationMail($event->formIntegrationsEvent));
        }
    }
}
