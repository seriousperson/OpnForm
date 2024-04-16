<?php

namespace App\Listeners\Forms;

use App\Events\Forms\FormSubmitted;
use App\Models\Integration\FormIntegration;
use App\Service\Forms\Integrations\AbstractIntegrationHandler;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class NotifyFormSubmission implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Sends notification to pre-defined emails on form submissions
     *
     * @param object $event
     * @return void
     */
    public function handle(FormSubmitted $event)
    {
        $formIntegrations = $event->form->integrations()->where('status', FormIntegration::STATUS_ACTIVE)->get();
        Log::debug("FormSubmitted: Notifying submission. Count: ".$formIntegrations->count());
        foreach ($formIntegrations as $formIntegration) {
            $this->getIntegrationHandler($event, $formIntegration)->run();
        }
    }

    public static function getIntegrationHandler(FormSubmitted $event,  FormIntegration $formIntegration): AbstractIntegrationHandler {
        $integration = FormIntegration::getIntegration($formIntegration->integration_id);
        Log::debug("FormSubmission File: ".$integration['file_name']);
        $class = 'App\Service\Forms\Integrations\\' . $integration['file_name'];
        if ($integration && isset($integration['file_name']) && class_exists($class)) {
            return new $class($event, $formIntegration, $integration);
        }
        throw new \Exception('Unknown Integration!');
    }
}
