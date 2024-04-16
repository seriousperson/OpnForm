<?php

namespace App\Mail\Forms;

use App\Mail\OpenFormMail;
use App\Models\Integration\FormIntegration;
use App\Models\Integration\FormIntegrationsEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class FormIntegrationsEventCreationConfirmationMail extends OpenFormMail implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    public $formIntegration;
    public $form;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(public FormIntegrationsEvent $formIntegrationsEvent)
    {
        $this->formIntegration = $formIntegrationsEvent->integration;
        $this->form = $this->formIntegration->form;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        //to-do:: need to fix
        $integration = FormIntegration::getIntegration($this->formIntegration->integration_id);
        return $this
            ->from('formIntegrationsEventCreationConfirmationMail@email.com')
            ->replyTo('formIntegrationsEventCreationConfirmationMail@email.com')
            ->markdown('mail.form.integrations-event-created', [
                'form' => $this->form,
                'integration_name' => $integration['name'] ?? '',
                'error' => json_encode($this->formIntegrationsEvent->data)
            ])->subject("Integration issue with your form: '" . $this->form->title . "'");
    }
}
