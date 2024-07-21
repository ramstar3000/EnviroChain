from substrateinterface import SubstrateInterface, Keypair
from requests import request

keypair = Keypair.create_from_uri('//Alice')

substrate = SubstrateInterface(
    url="ws://127.0.0.1:9944",
    ss58_format=0,
    type_registry_preset='polkadot'
)

def index():
    output = ""
    if request.method == 'POST':
        destination = request.form.get('destination')
        amount = request.form.get('amount')
        try:
            amount = int(amount)

            call = substrate.compose_call(
                call_module='Balances',
                call_function='transfer',
                call_params={
                    'dest': destination,
                    'value': amount * 10**15
                }
            )
            payment_info = substrate.get_payment_info(call=call, keypair=keypair)

            output = f"Destination: {destination}, Amount: {amount}\n, Fee: {payment_info['partialFee']}"
        except ValueError:
            output = "Invalid input: Amount must be an integer"
    return ('index.html', output=output)
